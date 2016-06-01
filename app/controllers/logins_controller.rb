class LoginsController < ApplicationController
  layout "welcome_layout"

  def welcome
    redirect_to app_url if current_user
    render :welcome
  end

end
