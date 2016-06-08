class User < ActiveRecord::Base
  include Permissions

  attr_reader :password

  validates :email, uniqueness: true

  validates :email,
            :session_token, presence: true

  validates :password, length: { minimum: 8, allow_nil: true }

  validate :has_password_or_oauth_id

  after_initialize :ensure_session_token

  has_many :team_memberships

  has_many :teams, through: :team_memberships, source: :team

  has_many :tasks, through: :teams, source: :tasks

  has_many :comments, foreign_key: :author_id

  has_attached_file :avatar, default_url: "missing.png", styles: { thumb: "100x100#"}
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  def has_password_or_oauth_id
    if (self.password_digest.nil? && self.google_uid.nil?)
      errors.add("user must have either a valid password or oauth identifier")
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save
    return self.session_token
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return user if user && user.is_password?(password)
    nil
  end

  def self.find_or_create_from_auth_hash(auth_hash)

    user = User.find_by(google_uid: auth_hash[:uid])
    if user.nil?
      user = User.create!(
        google_uid: auth_hash[:uid],
        email: auth_hash[:info][:email],
        first_name: auth_hash[:info][:first_name],
        last_name: auth_hash[:info][:last_name],
        avatar:  URI.parse(auth_hash[:info][:image])
      )
    end
    user
  end

  def has_permission(team, action)
    permissions = self.team_memberships.find_by(team_id: team.id).permissions
    (permissions & PERMISSIONS[action]) != 0
  rescue
    false
  end

  private

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end

end
