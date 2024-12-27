import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {getPrivateSnippets, getPublicSnippets, getStarredSnippets} from "../actions/mySnippets";
import SnippetBox from "../(main)/_components/SnippetBox";

export default async function page() {
  const publicSnippets = await getPublicSnippets();
  const privateSnippets = await getPrivateSnippets();
  const starredSnippets = await getStarredSnippets();
  return (
    <div className="container">
      <Tabs defaultValue="public" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="public" className="w-full">
            Public
          </TabsTrigger>
          <TabsTrigger value="private" className="w-full">
            Private
          </TabsTrigger>
          <TabsTrigger value="starred" className="w-full">
            Starred
          </TabsTrigger>
        </TabsList>
        <TabsContent value="public">
          <div className="mt-10 grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1 pb-20">
            {publicSnippets.length ? publicSnippets.map((item) => <SnippetBox item={item} key={item.id} />) : <></>}
          </div>
        </TabsContent>
        <TabsContent value="private">
          <div className="mt-10 grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1 pb-20">
            {privateSnippets.length ? privateSnippets.map((item) => <SnippetBox item={item} key={item.id} />) : <></>}
          </div>
        </TabsContent>
        <TabsContent value="starred">
          <div className="mt-10 grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1 pb-20">
            {starredSnippets.length ? starredSnippets.map((item) => <SnippetBox item={item} key={item.id} />) : <></>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
