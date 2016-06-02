class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render "api/sessions/show"
    else
      render json: {errors: @user.errors.full_messages }, status: 422
    end
  end

  def update
    @user = current_user
    if @user && @user.update(user_params)
      render "api/sessions/show"
    else
      render json: {errors: ["request failed"]}, status: 422
    end
  end


  private

  def user_params
    params.require(:user)
      .permit(:email, :first_name, :last_name, :password)
  end

end
