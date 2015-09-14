Rails.application.routes.draw do
  devise_for :users

  root 'visitors#index'

  namespace :reports, as: :report do
    get :subjects
  end

  resources :students do
    get :subjects
  end
  resources :teachers
end
