Rails.application.routes.draw do
  devise_for :users

  root 'visitors#index'

  namespace :reports, as: :report do
    get :subjects
  end

  concern :has_subjects do
    get :subjects
  end
  resources :students, concerns: :has_subjects
  resources :teachers, concerns: :has_subjects
end
