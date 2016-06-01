class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
    @current_user
  end

  def login!(user)
    @current_user = user
    session[:session_token] = @current_user.reset_session_token!
  end

  def logout!
    @current_user.reset_session_token! if current_user
    @current_user = nil
  end

  def require_login!
    redirect_to welcome_url unless current_user
  end
end
