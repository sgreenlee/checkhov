class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :first_name
      t.string :last_name

      t.string :session_token, null: false
      t.string :password_digest, null: false
      t.string :confirmation_token
      t.boolean :account_confirmed, default: false

      t.timestamps null: false
    end

    add_index :users, :email, unique: true
    add_index :users, :session_token
  end
end
