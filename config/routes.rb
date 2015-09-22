Rails.application.routes.draw do
  get 'users/index'

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
  resources :users, only: :index do
    member do
      get :messages
    end
  end
  resources :payments, only: :index
end
