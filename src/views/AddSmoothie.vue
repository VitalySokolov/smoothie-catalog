<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" id="title" name="title" v-model="title">
      </div>
      <div v-for="(ingredient, index) in ingredients" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" id="ingredient" v-model="ingredients[index]">
      </div>
      <div class="field">
        <label for="add-ingredient">Add an ingredient</label>
        <input
            type="text"
            name="add-ingredient"
            id="add-ingredient"
            v-model="another"
            @keydown.tab.prevent="addIngredient">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
  import db from '@/firebase/init';
  import slugify from 'slugify';

  export default {
    name: "add-smoothie",
    data() {
      return {
        title: null,
        another: null,
        ingredients: [],
        feedback: null,
        slug: null
      }
    },
    methods: {
      addSmoothie() {
        if (!this.title) {
          this.feedback = 'You must enter a smoothie title';
          return;
        }

        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });

        db.collection('smoothies').add({
              title: this.title,
              ingredients: this.ingredients,
              slug: this.slug
            })
            .then(() => {
              this.$router.push({name: 'index'});
            })
            .catch((err) => {
              console.log(err);
            });
      },

      addIngredient() {
        if (!this.another) {
          this.feedback = 'You need enter a value to add an ingredient';
          return;
        }

        this.feedback = null;
        this.ingredients.push(this.another);
        this.another = null;
        console.log(this.ingredients);
      }

    },
  }
</script>

<style scoped>
  .add-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
  }

  h2 {
    font-size: 2em;
    margin: 20px auto;
  }

  .field {
    margin: 20px auto;
  }
</style>