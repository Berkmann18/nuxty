<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.text }}</p>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  apollo: {
    post: {
      query: gql`query Post($slug: String!){
        post(filter: { slug: {
          eq: $slug
        }}) {
          title
          text
        }
      }`,
      prefetch({ route }) {
        return {
          slug: route.params.slug
        }
      },
      variables() {
        return {
          slug: this.$route.params.slug
        }
      }
    }
  }
}
</script>
