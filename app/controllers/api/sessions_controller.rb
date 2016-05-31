class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user][:email],
                                     params[:user][:password])
    if @user
      login!(@user)
      render :show
    else
      render json: {errors: ["Wrong email or password."]}
    end
  end

  def destroy
    logout!
    render json: {}
  end

  def show
    @user = current_user
    if @user
      render :show
    else
      render json: {}
    end
  end
end
