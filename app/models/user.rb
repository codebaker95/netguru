class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :sent_messages, class_name: "Message", foreign_key: "sender_id", dependent: :destroy
  has_many :received_messages, class_name: "Message", foreign_key: "recipient_id", dependent: :destroy

  validates :username, presence: true, uniqueness: true

  scope :by_sing_in, ->{ order(last_sign_in_at: :desc) }
  scope :unread, ->(user){ sent_messages.where(recipient: user).count }
end
