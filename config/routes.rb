Rails.application.routes.draw do

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  root to: "static_pages#welcome"
  get "/app" => "static_pages#app", as: "app"

  namespace :api, defaults: {format: :json } do

    resource :users, only: [:create]
    resource :session, only: [:create, :destroy, :show]

  end
end
