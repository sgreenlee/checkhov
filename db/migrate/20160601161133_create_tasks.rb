class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.integer :team_id, null: false
      t.integer :project_id
      t.integer :assignee_id
      t.date :due_date
      t.boolean :completed, default: false

      t.timestamps null: false
    end

    add_index :tasks, :team_id
  end
end
