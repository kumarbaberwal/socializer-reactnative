import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { styles } from '@/styles/feed.styles'
import { Stories } from '@/constants/MockData'
import Story from './Story'

export default function StoriesSection() {
    return (
        <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            style={styles.storiesContainer}
        >
            {Stories.map((story) => (
                <Story
                    story={story}
                    key={story.id}
                />
            ))}
        </ScrollView>
    )
}