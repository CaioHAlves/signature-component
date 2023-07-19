import React from 'react';
import { Meta, StoryFn } from '@storybook/react'
import { Drawing, Props, clearDrawing } from '..'

const ComponentForStorybook = (props: Props) => {
  return (
    <>
      <button onClick={clearDrawing}>
        Clear
      </button>
      <Drawing {...props} />
    </>
  )
}

const meta: Meta = {
  component: ComponentForStorybook,
  title: "Drawing",
}

const divRoot = document.getElementById("storybook-root")
const htmlEl = document.querySelector("html")

export default meta

const Template: StoryFn<Props> = args => <ComponentForStorybook {...args} />

export const Default = Template.bind({})

Default.args = {
  lineWidth: 5,
  penColor: "green",
  drawingHeight: "100%",
  drawingWidth: "100%",
  backgroundColor: "#FFFFFF"
}

if (divRoot && divRoot.style) {
  divRoot.style.height = "100%"
  divRoot.style.width = "100%"
  divRoot.style.overflow = "auto"
}
if (htmlEl && htmlEl.style) {
  htmlEl.style.height = "100vh"
  htmlEl.style.width = "100vw"
  htmlEl.style.overflow = "hidden"
}