require 'spec_helper'

feature 'Visitor signs up' do
  let(:user) { create :user }

  scenario 'with valid email and password' do
    sign_up_with 'test', 'test@email.com', 'password'
    expect(page).to have_content('Logout')
    expect(page).to have_content('School Diary Application')
  end

  scenario 'with invalid email' do
    sign_up_with 'test', 'invalid_email', user.password
    expect(page).to have_content('is invalid')
  end

  scenario 'with blank password' do
    sign_up_with user.username, user.email, ''
    expect(page).to have_content("can't be blank")
  end
end
