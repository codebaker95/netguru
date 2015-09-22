class Payment < ActiveRecord::Base
  belongs_to :student

  scope :by_time, ->{ order(year: :desc, month: :desc) }

  validates :student, :month, :year, presence: true
  validates :month, inclusion: 1..12
end
