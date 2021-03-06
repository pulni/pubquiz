class QuizzesController < ApplicationController
  before_action :set_quiz, only: [:show, :edit, :update, :destroy]
  before_action :set_play_quiz, only: [:play, :players]

  layout 'react', only: [:play, :show]

  # GET /quizzes/1/play
  def play
    quiz_player = QuizPlayer.find_or_create_by(quiz: @quiz, player: current_user)
    @player_name = current_user.name
  end

  # GET /quizzes/1
  # GET /quizzes/1.json
  def show
  end

  # POST /quizzes
  # POST /quizzes.json
  def create
    @quiz = current_user.owned_quizzes.build(quiz_params)

    respond_to do |format|
      if @quiz.save
        format.html { redirect_to @quiz, notice: 'Quiz was successfully created.' }
        format.json { render :show, status: :created, location: @quiz }
      else
        format.html { render :new }
        format.json { render json: @quiz.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /quizzes/1
  # DELETE /quizzes/1.json
  def destroy
    @quiz.update(deleted_at: Time.current)
    respond_to do |format|
      format.html { redirect_to root_url, notice: 'Quiz was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_quiz
      @quiz = current_user.owned_quizzes.undeleted.find(params[:id])
    end

    def set_play_quiz
      @quiz = Quiz.undeleted.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def quiz_params
      params.require(:quiz).permit(:name)
    end
end
