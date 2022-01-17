const Sauce = require("../models/sauce");

class LikeSystem {

// option "J'aime"
  like(userId, sauceId, res) {
    Sauce.updateOne(
      { _id: sauceId },
      
      { $inc: { likes: 1 }, $push: { usersLiked: userId }, _id: sauceId }
    )
      .then(() => res.status(200).json({ message: "Vous aimez cette sauce" }))
      .catch((error) => res.status(400).json({ error }));
    console.log("liked");
  }

// option "j'aime pas"
  dislike(userId, sauceId, res) {
    Sauce.updateOne(
      { _id: sauceId },
      { $inc: { dislikes: 1 }, $push: { usersDisliked: userId }, _id: sauceId }
    )
      .then(() =>
        res.status(200).json({ message: "Vous n'aimez pas cette sauce" })
      )
      .catch((error) => res.status(400).json({ error }));
    console.log("disliked");
  }

  // Annulation de like/dislike
  cancel(userId, sauceId, res) {
    Sauce.findOne({ _id: sauceId }).then((sauce) => {
      if (sauce.usersLiked.indexOf(userId) !== -1) {
        Sauce.updateOne(
          { _id: sauceId },
          { $inc: { likes: -1 }, $pull: { usersLiked: userId }, _id: sauceId }
        )
          .then(() =>
            res
              .status(200)
              .json({ message: "Vous avez annulé votre avis" })
          )
          .catch((error) => res.status(400).json({ error }));
      } 
      
      else if (sauce.usersDisliked.indexOf(userId) !== -1) {
        Sauce.updateOne(
          { _id: sauceId },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: userId },
            _id: sauceId,
          }
        )
          .then(() =>
            res.status(200).json({ message: "Vous avez annulé votre avis" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
      console.log("canceled");
    });
  }
}

module.exports = LikeSystem;
