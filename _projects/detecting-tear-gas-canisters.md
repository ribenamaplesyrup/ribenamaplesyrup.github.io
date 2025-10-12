---
layout: project
title: "Detecting Tear Gas Canisters with Limited Training Data"
description: "Object detection for human rights investigations"
year: 2021
tags: [Computer Vision]
cover_image: '/images/projects/detecting-tear-gas-canisters/cover.jpg'
hero_image: '/images/projects/detecting-tear-gas-canisters/cover.jpg'
---
Human rights investigations often require triaging large volumes of open source data in order to find moments within image, or video that are relevant to a given investigation and warrant further inspection. 37-40mm tear gas canisters are some of the most common munitions used against protesters worldwide, however searching for images containing tear gas usage online manually is laborious and time-consuming. 

![Report](/images/projects/detecting-tear-gas-canisters/sample.png)

Working with several researchers from [Forensic Architecture](https://forensic-architecture.org/){:target="_blank" rel="noopener noreferrer"}, we focussed on applying object detection models to facilitate discovery and identification of tear gas canisters for human rights monitors. For convolutional neural network (CNN) based object detection to work, a large amount of training data is required. To achieve our objective, we benchmark methods for training object detectors using limited labelled data: we fine-tune different object detection models on the limited labelled data and compare performance to a few shot detector and augmentation strategies using synthetic data. We provide a dataset for evaluating and training tear gas canister detectors and show how such detectors can be deployed for a real world application such as investigating human rights violations. Our experiments show that fine-tuning state of the art detectors perform as well as the few shot detector, and including synthetic data can improve results. Within this research my contributions involved training several state of the art detectors (Faster R-CNN and RetinaNet) for benchmarking, data labelling and pre-processing as well as report writing. 

![Report](/images/projects/detecting-tear-gas-canisters/canisters.png)

Published at: [Winter Conference for Applications of Computer Vision 2022](https://ieeexplore.ieee.org/document/9706699){:target="_blank" rel="noopener noreferrer"}

Collaboration with Lachlan Kermode, Chris Tegho and Ashwin D’Cruz
