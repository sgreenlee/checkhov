class SessionsController < ApplicationController
  layout "welcome_layout"

  def welcome
    redirect_to app_url if current_user
    render :welcome
  end

  def oauth
    @user = User.find_or_create_from_auth_hash(request.env["omniauth.auth"])
    login!(@user)
    redirect_to "/"
  end

end
