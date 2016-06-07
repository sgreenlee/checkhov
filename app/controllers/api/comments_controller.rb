class Api::CommentsController < ApplicationController

  def index
    @task = current_user.tasks.find(params[:task_id])
    @comments = @task.comments
                  .joins(:author)
                  .select("comments.*, users.first_name, users.last_name, users.email")
    render :index
  end

  def create
    @comment = current_user.tasks.find(params[:task_id]).comments.new(comment_params)
    @comment.author = current_user
    @author = current_user
    if @comment.save
      render :show
    else
      render json: { errors: @comment.errors.full_messages }, status: 422
    end
  end


  def destroy
    @comment = current_user.comments.find(params[:id])
    @comment.destroy
    render :show
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end
end
