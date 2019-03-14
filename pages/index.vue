<template>
  <section class="container">
    <div>
      <h1 class="title">
        nuxty
      </h1>
      <h2 class="subtitle">
        My CMSed Static Nuxt Project
      </h2>
      <div>
        <ul>
          <li
            v-for="(post, index) in allPosts"
            :key="index"
          >
            <h2>
              <nuxt-link :to="`/blog/${post.slug}`">
                {{ post.title }}
              </nuxt-link>
            </h2>
            <p>{{ post.text }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    allPosts: gql`{
      allPosts {
        title
        text
        slug
      }
    }`
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
