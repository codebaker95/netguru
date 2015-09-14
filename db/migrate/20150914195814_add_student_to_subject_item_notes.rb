class AddStudentToSubjectItemNotes < ActiveRecord::Migration
  def change
    add_reference :subject_item_notes, :student, index: true, foreign_key: true
  end
end
