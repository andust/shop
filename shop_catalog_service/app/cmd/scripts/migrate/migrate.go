package migrate

import (
	"errors"
	"io"
	"os"

	"github.com/andust/shop_catalog_service/core"
	"github.com/andust/shop_catalog_service/repository"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
)

func MigrateUp(c *core.Core, args ...string) {
	driver, err := postgres.WithInstance(repository.DB().DB, &postgres.Config{})
	if err != nil {
		c.ErrorLog.Fatalln(err)
	}
	m, err := migrate.NewWithDatabaseInstance("file://migrate/migrations", "postgres", driver)
	if err != nil {
		c.ErrorLog.Fatalln(err)
	}
	err = m.Up()
	if err != nil {
		if errors.Is(err, migrate.ErrNoChange) {
			c.InfoLog.Fatalln(err)
		}
		c.ErrorLog.Fatalln(err)
	}
	c.InfoLog.Println("migration completed successfully")
}

func MigrateDevData(c *core.Core, args ...string) {
	queriesFile, err := os.Open("dev-data.sql")
	if err != nil {
		c.ErrorLog.Fatalln(err)
	}
	defer queriesFile.Close()

	sqlBytes, err := io.ReadAll(queriesFile)
	if err != nil {
		c.ErrorLog.Fatalln(err)
	}

	sqlString := string(sqlBytes)
	_, err = repository.DB().Exec(sqlString)
	if err != nil {
		c.ErrorLog.Fatalln(err)
	}
	c.InfoLog.Println("dev data inserted")
}
