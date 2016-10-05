<template>
    <div class="doc-content">
        <div class="content-inner">
            <section v-for="section in sections" id="{{ section.identifier }}" class="doc-section">
                <h2 class="section-title">{{ section.label }}</h2>
                <db-add-content-block :index="-1" :identifier="section.identifier"></db-add-content-block>

                <div class="sub-section-content" v-if="section_content[section.identifier]">
                    <div v-for="item in section_content[section.identifier]">
                        <db-content-type :type="item.type" :content="item.content" :id="item.id" :identifier="section.identifier"></db-content-type>
                        <db-add-content-block :index="$index" :identifier="section.identifier"></db-add-content-block>
                    </div>
                </div>

                <div id="{{ sub_section.location }}"  class="section-block" v-for="sub_section in section.sub_sections">
                    <h3 class="block-title">{{ sub_section.label }}</h3>
                    <db-add-content-block :index="-1" :identifier="sub_section.identifier"></db-add-content-block>

                    <div class="sub-section-content" v-if="section_content[sub_section.identifier]">
                        <div v-for="item in section_content[sub_section.identifier]">
                            <db-content-type :type="item.type" :content="item.content" :id="item.id" :identifier="section.identifier"></db-content-type>
                            <db-add-content-block :index="$index" :identifier="sub_section.identifier"></db-add-content-block>
                        </div>
                    </div>
                </div><!--//section-block-->
            </section><!--//doc-section-->
        </div><!--//content-inner-->
    </div><!--//doc-content-->
</template>

<script>
    import store from '../store'
    import ContentTypesComponent from './ContentTypesComponent.vue'
    import AddContentBlockComponent from './AddContentBlockComponent.vue'

    export default {
        components: {
            'db-content-type': ContentTypesComponent,
            'db-add-content-block': AddContentBlockComponent
        },

        ready () {},
        props: ['sections', 'section_content']
    }
</script>
