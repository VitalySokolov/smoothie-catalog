<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{ smoothie.title }} Smoothie</h2>
    <form @submit.prevent="editSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" id="title" name="title" v-model="smoothie.title">
      </div>
      <div v-for="(ingredient, index) in smoothie.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" id="ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ingredient)">delete</i>
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
        <button class="btn pink">Update smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
  import db from '@/firebase/init';
  import slugify from 'slugify';

  export default {
    // name: "edit-smoothie",
    data() {
      return {
        smoothie: null,
        another: null,
        feedback: null,
      }
    },
    methods: {
      editSmoothie() {
        if (!this.smoothie.title) {
          this.feedback = 'You must enter a smoothie title';
          return;
        }

        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });

        db.collection('smoothies').doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
          })
          .then(() => {
            this.$router.push({ name: 'index' });
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

        this.smoothie.ingredients.push(this.another);
        this.feedback = null;
        this.another = null;
      },

      deleteIng(ing) {
        this.smoothie.ingredients = this.smoothie.ingredients.filter((ingredient) => ingredient !== ing);
      }

    },
    created() {
      const ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug);
      ref.get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.smoothie = doc.data();
            this.smoothie.id = doc.id;
          })
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
</script>

<style scoped>
  .edit-smoothie {
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
    position: relative;
  }

  .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }
</style>
