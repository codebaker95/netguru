puts "Seeds: start"
TEACHER_TITLES = %w(Dr. Prof. TA)
admin = User.create!(email: 'admin@admin.com',password: 'adminadmin', username: "admin")

10.times do
  user = User.create!(
    username: Faker::Internet.user_name,
    email: Faker::Internet.email,
    password: 'password'
  )

  rand(0..5).times { Message.create(sender: user, recipient: admin, body: Faker::Lorem.sentence) }
end

3.times do
  Teacher.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    academic_title: TEACHER_TITLES.sample
  )
end

teachers = Teacher.all
5.times do
  SubjectItem.create!(
    title: Faker::Lorem.sentence,
    teacher: teachers.sample
  )
end

25.times do
  student = Student.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name
  )

  rand(1..12).times do |n|
    Payment.create!(
      student: student,
      month: n+1,
      year: 2015
    )
  end
end

students = Student.all
SubjectItem.all.each do |subject_item|
  subject_item.students << students.sample(rand(1..4))
end

SubjectItem.all.each do |subject_item|
  subject_item.students.each do |student|
    rand(1..5).times do
      subject_item.subject_item_notes << SubjectItemNote.create(student: student,
                                                                subject_item: subject_item,
                                                                value: rand(1..6))
    end
  end
end

puts "Seeds: done"
