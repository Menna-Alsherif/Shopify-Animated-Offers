import { composeMongoose } from "graphql-compose-mongoose";
import { schemaComposer } from "graphql-compose";

import offer from "../../models/offer";
import offerType from "../../models/offer-type";
import offerEvent from "../../models/offer-event";
import template from "../../models/template";

const customizationOptions = {};

if (!global.graphQLSchema) {
  // offer
  const OfferTC = composeMongoose(offer, customizationOptions);

  schemaComposer.Query.addFields({
    offerById: OfferTC.mongooseResolvers.findById(),
    offerByIds: OfferTC.mongooseResolvers.findByIds(),
    offerOne: OfferTC.mongooseResolvers.findOne(),
    offerMany: OfferTC.mongooseResolvers.findMany(),
    offerDataLoader: OfferTC.mongooseResolvers.dataLoader(),
    offerDataLoaderMany: OfferTC.mongooseResolvers.dataLoaderMany(),
    offerCount: OfferTC.mongooseResolvers.count(),
    offerConnection: OfferTC.mongooseResolvers.connection(),
    offerPagination: OfferTC.mongooseResolvers.pagination(),
  });

  schemaComposer.Mutation.addFields({
    offerCreateOne: OfferTC.mongooseResolvers.createOne(),
    offerCreateMany: OfferTC.mongooseResolvers.createMany(),
    offerUpdateById: OfferTC.mongooseResolvers.updateById(),
    offerUpdateOne: OfferTC.mongooseResolvers.updateOne(),
    offerUpdateMany: OfferTC.mongooseResolvers.updateMany(),
    offerRemoveById: OfferTC.mongooseResolvers.removeById(),
    offerRemoveOne: OfferTC.mongooseResolvers.removeOne(),
    offerRemoveMany: OfferTC.mongooseResolvers.removeMany().addFilterArg({
      name: "Ids",
      type: "[MongoID]",
      description: "delete many Ids",
      query: (rawQuery, value) => {
        rawQuery._id = { $in: value };
      },
    }),
  });

  // offer-type
  const OfferTypeTC = composeMongoose(offerType, customizationOptions);

  schemaComposer.Query.addFields({
    offerTypeById: OfferTypeTC.mongooseResolvers.findById(),
    offerTypeByIds: OfferTypeTC.mongooseResolvers.findByIds(),
    offerTypeOne: OfferTypeTC.mongooseResolvers.findOne(),
    offerTypeMany: OfferTypeTC.mongooseResolvers.findMany(),
    offerTypeDataLoader: OfferTypeTC.mongooseResolvers.dataLoader(),
    offerTypeDataLoaderMany: OfferTypeTC.mongooseResolvers.dataLoaderMany(),
    offerTypeCount: OfferTypeTC.mongooseResolvers.count(),
    offerTypeConnection: OfferTypeTC.mongooseResolvers.connection(),
    offerTypePagination: OfferTypeTC.mongooseResolvers.pagination(),
  });

  schemaComposer.Mutation.addFields({
    offerTypeCreateOne: OfferTypeTC.mongooseResolvers.createOne(),
    offerTypeCreateMany: OfferTypeTC.mongooseResolvers.createMany(),
    offerTypeUpdateById: OfferTypeTC.mongooseResolvers.updateById(),
    offerTypeUpdateOne: OfferTypeTC.mongooseResolvers.updateOne(),
    offerTypeUpdateMany: OfferTypeTC.mongooseResolvers.updateMany(),
    offerTypeRemoveById: OfferTypeTC.mongooseResolvers.removeById(),
    offerTypeRemoveOne: OfferTypeTC.mongooseResolvers.removeOne(),
    offerTypeRemoveMany: OfferTypeTC.mongooseResolvers.removeMany(),
  });

  //template
  const templateTC = composeMongoose(template, customizationOptions);

  schemaComposer.Query.addFields({
    templateById: templateTC.mongooseResolvers.findById(),
    templateByIds: templateTC.mongooseResolvers.findByIds(),
    templateOne: templateTC.mongooseResolvers.findOne(),
    templateMany: templateTC.mongooseResolvers.findMany().addFilterArg({
      name: "catId",
      type: "Int",
      description: "Filter templates by catId",
      query: (rawQuery, value) => {
        rawQuery.cats = { $in: [value] };
      },
    }),
    templateDataLoader: templateTC.mongooseResolvers.dataLoader(),
    templateDataLoaderMany: templateTC.mongooseResolvers.dataLoaderMany(),
    templateCount: templateTC.mongooseResolvers.count(),
    templateConnection: templateTC.mongooseResolvers.connection(),
    templatePagination: templateTC.mongooseResolvers.pagination(),
  });

  schemaComposer.Mutation.addFields({
    templateCreateOne: templateTC.mongooseResolvers.createOne(),
    templateCreateMany: templateTC.mongooseResolvers.createMany(),
    templateUpdateById: templateTC.mongooseResolvers.updateById(),
    templateUpdateOne: templateTC.mongooseResolvers.updateOne(),
    templateUpdateMany: templateTC.mongooseResolvers.updateMany(),
    templateRemoveById: templateTC.mongooseResolvers.removeById(),
    templateRemoveOne: templateTC.mongooseResolvers.removeOne(),
    templateRemoveMany: templateTC.mongooseResolvers.removeMany(),
  });

  // offer-type
  const OfferEventTC = composeMongoose(offerEvent, customizationOptions);

  schemaComposer.Query.addFields({
    offerEventById: OfferEventTC.mongooseResolvers.findById(),
    offerEventByIds: OfferEventTC.mongooseResolvers.findByIds(),
    offerEventOne: OfferEventTC.mongooseResolvers.findOne(),
    offerEventMany: OfferEventTC.mongooseResolvers.findMany(),
    offerEventDataLoader: OfferEventTC.mongooseResolvers.dataLoader(),
    offerEventDataLoaderMany: OfferEventTC.mongooseResolvers.dataLoaderMany(),
    offerEventCount: OfferEventTC.mongooseResolvers.count(),
    offerEventConnection: OfferEventTC.mongooseResolvers.connection(),
    offerEventPagination: OfferEventTC.mongooseResolvers.pagination(),
  });

  schemaComposer.Mutation.addFields({
    offerEventCreateOne: OfferEventTC.mongooseResolvers.createOne(),
    offerEventCreateMany: OfferEventTC.mongooseResolvers.createMany(),
    offerEventUpdateById: OfferEventTC.mongooseResolvers.updateById(),
    offerEventUpdateOne: OfferEventTC.mongooseResolvers.updateOne(),
    offerEventUpdateMany: OfferEventTC.mongooseResolvers.updateMany(),
    offerEventRemoveById: OfferEventTC.mongooseResolvers.removeById(),
    offerEventRemoveOne: OfferEventTC.mongooseResolvers.removeOne(),
    offerEventRemoveMany: OfferEventTC.mongooseResolvers.removeMany(),
  });

  global.graphQLSchema = schemaComposer.buildSchema();
}

const schema = global.graphQLSchema;
export default schema;
