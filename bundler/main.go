package main

import (
	"os"

	"github.com/evanw/esbuild/pkg/api"
)

func main() {
	result := api.Build(api.BuildOptions{
		EntryPoints:       []string{"src/index.ts"},
		Outdir:            "public/js/",
		Bundle:            true,
		Write:             true,
		LogLevel:          api.LogLevelInfo,
		ChunkNames:        "chunks/[name]-[hash]",
		MinifyWhitespace:  true,
		MinifyIdentifiers: true,
		MinifySyntax:      true,
		Splitting:         true,
		Format:            api.FormatESModule,
		Color:             api.ColorAlways,
		Engines: []api.Engine{
			{Name: api.EngineChrome, Version: "97"},
			{Name: api.EngineFirefox, Version: "96"},
			{Name: api.EngineSafari, Version: "15"},
			{Name: api.EngineEdge, Version: "97"},
		},
	})
	if len(result.Errors) > 0 {
		os.Exit(1)
	}
}
