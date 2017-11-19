
Song.destroy_all

Song.create!(
  [
    { name: "Billie Jean", created: true },
    { name: "Vivo per Lei", created: false },
    { name: "Lets get Loud", created: false },
  ],
)
