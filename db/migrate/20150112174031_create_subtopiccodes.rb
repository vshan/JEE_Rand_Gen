class CreateSubtopiccodes < ActiveRecord::Migration
  def change
    create_table :subtopiccodes do |t|
      t.integer :stcode
      t.string :stname
      t.integer :topiccode_id
      t.string :active, limit: 1

      t.timestamps
    end
  end
end
