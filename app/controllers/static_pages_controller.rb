class StaticPagesController < ApplicationController

  before_action :require_login!

  def app
    render :app
  end

end
