class CreatePayments < ActiveRecord::Migration
  def change
    create_table :payments do |t|
      t.references :student, index: true, foreign_key: true
      t.integer :month
      t.integer :year

      t.timestamps null: false
    end

    add_index :payments, [:student_id, :month, :year], unique: true
  end
end
