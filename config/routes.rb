Rails.application.routes.draw do
  devise_for :users

  get 'reports/subjects'

  resources :students do
    get :subjects
  end
  resources :teachers
end
