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

ActiveRecord::Schema.define(version: 20150922212110) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comments", force: :cascade do |t|
    t.string   "content"
    t.integer  "user_id"
    t.integer  "note_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "comments", ["note_id"], name: "index_comments_on_note_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "messages", force: :cascade do |t|
    t.integer  "sender_id"
    t.integer  "recipient_id"
    t.text     "body"
    t.boolean  "unread",       default: true
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "messages", ["recipient_id"], name: "index_messages_on_recipient_id", using: :btree
  add_index "messages", ["sender_id"], name: "index_messages_on_sender_id", using: :btree

  create_table "note_categories", force: :cascade do |t|
    t.integer  "note_id"
    t.integer  "category_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "note_categories", ["category_id"], name: "index_note_categories_on_category_id", using: :btree
  add_index "note_categories", ["note_id"], name: "index_note_categories_on_note_id", using: :btree

  create_table "notes", force: :cascade do |t|
    t.string   "title"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "user_id"
    t.integer  "category_id"
  end

  create_table "participations", force: :cascade do |t|
    t.integer  "student_id"
    t.integer  "subject_item_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "participations", ["student_id"], name: "index_participations_on_student_id", using: :btree
  add_index "participations", ["subject_item_id"], name: "index_participations_on_subject_item_id", using: :btree

  create_table "payments", force: :cascade do |t|
    t.integer  "student_id"
    t.integer  "month"
    t.integer  "year"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "payments", ["student_id", "month", "year"], name: "index_payments_on_student_id_and_month_and_year", unique: true, using: :btree
  add_index "payments", ["student_id"], name: "index_payments_on_student_id", using: :btree

  create_table "students", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date     "birthdate"
  end

  create_table "subject_item_notes", force: :cascade do |t|
    t.integer  "value"
    t.integer  "subject_item_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "student_id"
  end

  add_index "subject_item_notes", ["student_id"], name: "index_subject_item_notes_on_student_id", using: :btree
  add_index "subject_item_notes", ["subject_item_id"], name: "index_subject_item_notes_on_subject_item_id", using: :btree

  create_table "subject_items", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "teacher_id"
  end

  add_index "subject_items", ["teacher_id"], name: "index_subject_items_on_teacher_id", using: :btree

  create_table "teachers", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "academic_title"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "user_categories", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "category_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "user_categories", ["category_id"], name: "index_user_categories_on_category_id", using: :btree
  add_index "user_categories", ["user_id"], name: "index_user_categories_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "username"
    t.boolean  "online",                 default: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "participations", "students"
  add_foreign_key "participations", "subject_items"
  add_foreign_key "payments", "students"
  add_foreign_key "subject_item_notes", "students"
  add_foreign_key "subject_item_notes", "subject_items"
  add_foreign_key "subject_items", "teachers"
  add_foreign_key "user_categories", "categories"
end
