# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160608144554) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.integer  "task_id",    null: false
    t.integer  "author_id",  null: false
    t.text     "content",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "comments", ["task_id"], name: "index_comments_on_task_id", using: :btree

  create_table "projects", force: :cascade do |t|
    t.string   "title",       null: false
    t.text     "description"
    t.integer  "team_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "projects", ["team_id"], name: "index_projects_on_team_id", using: :btree

  create_table "tasks", force: :cascade do |t|
    t.string   "title",                       null: false
    t.text     "description"
    t.integer  "team_id",                     null: false
    t.integer  "project_id"
    t.integer  "assignee_id"
    t.date     "due_date"
    t.boolean  "completed",   default: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "tasks", ["team_id"], name: "index_tasks_on_team_id", using: :btree

  create_table "team_memberships", force: :cascade do |t|
    t.integer  "team_id",                 null: false
    t.integer  "user_id",                 null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "permissions", default: 0
  end

  create_table "teams", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                               null: false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "session_token",                       null: false
    t.string   "confirmation_token"
    t.boolean  "account_confirmed",   default: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "google_uid"
    t.string   "password_digest"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["google_uid"], name: "index_users_on_google_uid", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

end
