class Message < ActiveRecord::Base
  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"

  validates :body, presence: true

  scope :between, ->(user1, user2){ where("sender_id = :user1 AND recipient_id = :user2
    OR sender_id = :user2 AND recipient_id = :user1", user1: user1.id, user2: user2.id)}
end
