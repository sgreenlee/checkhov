class Api::TeamsController < ApplicationController

  def create
    @team = Team.new(team_params)
    if @team.save
      @team.newAdmin(current_user)
      render :show
    else
      render json: { errors: @team.errors.full_messages }, status: 422
    end
  end

  def index
    @teams = current_user.teams.select("teams.*, team_memberships.permissions")
    render :index
  end

  def show
    @team = current_user.teams.select("teams.*, team_memberships.permissions").find(params[:teamId])
    render :show
  end

  def update
    @team = current_user.teams.find(params[:id])
    if @team.update(team_params)
      render :show
    else
      render json: { errors: @team.errors.full_messages }
    end
  end

  private

  def team_params
    params.require(:team).permit(:name)
  end
end
