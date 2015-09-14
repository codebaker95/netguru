Rails.application.routes.draw do
  devise_for :users

  root 'visitors#index'

  get 'reports/subjects'

  resources :students do
    get :subjects
  end
  resources :teachers
end
