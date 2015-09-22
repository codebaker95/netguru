class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :sender_id
      t.integer :recipient_id
      t.text :body
      t.boolean :unread, default: true

      t.timestamps null: false
    end
    add_index :messages, :sender_id
    add_index :messages, :recipient_id
  end
end
