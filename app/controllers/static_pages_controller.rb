class StaticPagesController < ApplicationController

  def welcome
    redirect_to app_url if current_user
    render :welcome
  end

  def app
    render :app
  end
end
