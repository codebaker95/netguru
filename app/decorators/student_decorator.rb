class StudentDecorator < BaseDecorator
  def full_name
    "#{first_name} #{last_name}"
  end

  def avg_notes(subject_item)
    notes = subject_item_notes.where(subject_item: subject_item)
    "%.2f" % (notes.average(:value) || 0)
  end

  def birthdate
    object.birthdate.present? ? object.birthdate.strftime("%Y-%m_%d") : nil
  end
end
