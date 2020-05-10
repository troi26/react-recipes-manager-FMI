/*
идентификатор на рецептата (до 24 символа);
идентификатор на потребителя споделил рецептата (до 24 символа);
име на рецептата (до 80 символа);
кратко описание на рецептата (до 256 символа);
време за приготвяне (в минути);
използвани продукти (списък от продукти);
снимка на резултата от рецептата (валиден URL, задължителен атрибут);
подробно описание (до 2048 символа);
ключови думи - tags (списък от тагове);
дата и час на споделяне (генерира се автоматично);
дата и час на последна модификация (генерира се автоматично);*/

export const recipeConstraints = {
   MAX_NAME_LENGTH: 80,
   MAX_SHORT_DESCRIPTION_LENGTH: 256,
   MAX_DETAILED_DESCRIPTION_LENGTH: 2048,
};

export const findAllKeywords = (recipes) => {
   return [].concat.apply([], recipes.map(recipe => recipe.keywords));
}

export class Recipe {
   constructor(other) {
      this._id = other.id;
      this._authorId = other.authorId;
      this._name = other.name;
      this._cookingTime = other.cookingTime;
      this._shortDescription = other.shortDescription;
      this._products = other.products;
      this._photoPath = other.photoPath;
      this._detailedDescription = other.detailedDescription;
      this._keywords = other.keywords;
      this._shareTime = other.shareTime;
      this._modificationTime = other.modificationTime;
   }

   get id () {
      return this._id;
   }

   get authorId() {
      return this._authorId;
   }

   get name() {
      return this._name;
   }

   get cookingTime() {
      return this._cookingTime;
   }

   get shortDescription() {
      return this._shortDescription;
   }

   get products() {
      return this._products;
   }

   get photoPath() {
      return this._photoPath;
   }

   get detailedDescription() {
      return this._detailedDescription;
   }

   get keywords() {
      return this._keywords;
   }

   get shareTime() {
      return this._shareTime;
   }

   get modificationTime() {
      return this._modificationTime;
   }


   set id(id) {
      this._id = id;
   }

   set authorId(authorId) {
      this._authorId = authorId;
   }

   set name(name) {
      this._name = name;
   }

   set cookingTime(cookingTime) {
      this._cookingTime = cookingTime;
   }

   set shortDescription(shortDescription) {
      this._shortDescription = shortDescription;
   }

   set products(products) {
      this._products = products;
   }

   set photoPath(photoPath) {
      this._photoPath = photoPath;
   }

   set detailedDescription(detailedDescription) {
      this._detailedDescription = detailedDescription;
   }

   set keywords(keywords) {
      this._keywords = keywords;
   }

   set shareTime(shareTime) {
      this._shareTime = shareTime;
   }

   set modificationTime(modificationTime) {
      this._modificationTime = modificationTime;
   }

}