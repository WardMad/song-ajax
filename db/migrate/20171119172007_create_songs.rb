class CreateSongs < ActiveRecord::Migration[5.1]
  def change
    create_table :songs do |t|
      t.string :name
      t.boolean :created, null:false, default: false

      t.timestamps
    end
  end
end
