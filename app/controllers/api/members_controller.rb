class Api::MembersController < ApplicationController

    def index
      @team = current_user.teams.find(params[:team_id])
      @members = @team.members.all
      render :index
    end

    def create
      @team = current_user.teams.find(params[:team_id])
      if current_user.has_permission(@team, :add_member)
        @new_member = User.find_by(email: params[:member][:email])
        if @new_member
          @membership = @team.newGuest(@new_member)
          render :create
        else
          render json: {errors: ["user #{params[:member][:email]} not found"]}, status: 422
        end
      else
        render json: {errors: ["not authorized"]}, status: 403
      end
    end

    private

    def member_params
      params.require(:member).permit(:email)
    end
end
