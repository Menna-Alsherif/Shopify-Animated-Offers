// ************* Helper description *************

import { gql } from "@apollo/client";

export const GET_OFFERS = gql`
  query($shop: String!) {
    offerMany(filter: { shop: $shop }) {
      template {
        name
      }

      _id
      catId
      shop
      isActive
      startDate
    }
  }
`;

export const TOGGLE_STATUS = gql`
  mutation($id: ObjectId, $isActive: Boolean) {
    updateOneOffer(query: { _id: $id }, set: { isActive: $isActive }) {
      _id
      shop
      isActive
    }
  }
`;

export const EDIT_WEIGHT = gql`
  mutation($id: ObjectId, $weight: Int) {
    updateOneOffer(query: { _id: $id }, set: { weight: $weight }) {
      _id
      shop
      isActive
      weight
    }
  }
`;

export const DELETE_OFFER = gql`
  mutation($id: MongoID!) {
    offerRemoveOne(filter: { _id: $id }) {
      recordId
    }
  }
`;

export const DELETE_MANY_OFFERS = gql`
  mutation($ids: [MongoID]!) {
    offerRemoveMany(filter: { Ids: $ids }) {
      numAffected
    }
  }
`;

export const INSERT_OFFER = gql`
  mutation($offer: CreateOneofferInput!) {
    offerCreateOne(record: $offer) {
      record {
        _id
        shop
      }
    }
  }
`;

export const GET_TEMPLATES = gql`
  query($catId: Int) {
    templateMany(filter: { catId: $catId }) {
      _id
      cats
      internalName
      isActive
      name
      previewPath
      thumb_img
      preview_img
      scriptPath
      templatePath
      params {
        text {
          id
          label
          controlType
          value
        }
        images {
          id
        }
        colors {
          id
          label
          value
        }
      }
    }
  }
`;

export const GET_OFFER_TYPES = gql`
  query {
    offerTypeMany {
      _id
      id
      name
      isActive
      actions
      triggers
      conditions
    }
  }
`;
