class User < ActiveRecord::Base
  include Permissions

  attr_reader :password

  validates :email, uniqueness: true

  validates :email,
            :session_token,
            :password_digest, presence: true

  validates :password, length: { minimum: 8, allow_nil: true }

  after_initialize :ensure_session_token

  has_many :team_memberships

  has_many :teams, through: :team_memberships, source: :team

  has_many :tasks, through: :teams, source: :tasks

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

  def has_permission(team, action)
    permissions = self.team_memberships.find_by(team_id: team.id).permissions
    !!(permissions | PERMISSIONS[action])
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
