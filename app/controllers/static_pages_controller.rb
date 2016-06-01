class StaticPagesController < ApplicationController

  before_action :require_login!

  def root
    render :root
  end

end
