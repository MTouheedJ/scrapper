"use client";

import { FC, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import { LuLoaderCircle } from "react-icons/lu";
import { searchResponse } from "./types";

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const [searchQuery, setSearchQuery] = useState<string>(
    "display 10 influencer of crypto from Germany or USA"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<searchResponse[]>([]);

  const [scrapLoading, setScrapLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "https://coding1343453.app.n8n.cloud/webhook/c5a12841-4f48-40af-9054-9e2acdca802c",
        {
          chatInput: searchQuery,
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error calling API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full h-screen bg-white p-10 space-y-3">
      <div className="flex bg-white justify-center items-center border border-gray-500 rounded p-1 gap-1">
        <IoSearchOutline className="w-5 h-5" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="outline-none text-black border-0 w-full flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white w-20 py-2 rounded cursor-pointer"
        >
          {loading ? (
            <LuLoaderCircle className="w-6 h-6 animate-spin text-white mx-auto" />
          ) : (
            "Search"
          )}
        </button>
      </div>
      <div className="w-full bg-gray-50 h-[calc(100vh-145px)] overflow-y-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <LuLoaderCircle className="w-8 h-8 animate-spin text-gray-500" />
          </div>
        ) : searchResults.length > 0 ? (
          <div>
            <div className="w-full flex justify-end">
              <button className="bg-black text-white w-40 py-2 rounded cursor-pointer mb-2">
                {scrapLoading ? (
                  <LuLoaderCircle className="w-6 h-6 animate-spin text-white mx-auto" />
                ) : (
                  "Scrap Data"
                )}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  {/* Header with username and country */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      @{result.Username}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {result.Country}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {result.Followers.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {result.Likes.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Likes</div>
                    </div>
                  </div>

                  {/* Hashtag and Source */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-500">Hashtag:</span>
                      <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">
                        #{result.Hashtag}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Source:</span>
                      <span className="text-sm font-medium text-gray-700">
                        {result.Source}
                      </span>
                    </div>
                  </div>

                  {/* Profile Link */}
                  <a
                    href={result.Profile_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-black text-white text-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 block"
                  >
                    View Profile
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <IoSearchOutline className="w-16 h-16 mb-4 text-gray-300" />
            <h3 className="text-xl font-medium mb-2">No results found</h3>
            <p className="text-center">
              Try searching for influencers in different countries or hashtags
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
