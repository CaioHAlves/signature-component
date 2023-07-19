import React from 'react';
import { Meta, StoryFn } from '@storybook/react'
import { Drawing, Props } from '..'

const meta: Meta = {
  component: Drawing,
  title: "Drawing",
}

const divRoot = document.getElementById("storybook-root")
const bodyEl = document.querySelector("body")
const htmlEl = document.querySelector("html")

export default meta

const Template: StoryFn<Props> = args => <Drawing {...args} />

export const Default = Template.bind({})

Default.args = {
  lineWidth: 5,
  penColor: "green",
  drawingHeight: "100%",
  drawingWidth: "100%",
  backgroundColor: "#FFFFFF"
}

if (bodyEl && bodyEl.style) {
  bodyEl.style.height = "100%"
  bodyEl.style.width = "100%"
}
if (divRoot && divRoot.style) {
  divRoot.style.height = "100%"
  divRoot.style.width = "100%"
}
if (htmlEl && htmlEl.style) {
  htmlEl.style.height = "100%"
  htmlEl.style.width = "100%"
}