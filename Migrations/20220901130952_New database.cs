using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HowIdidIT.Migrations
{
    public partial class Newdatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "pictures",
                columns: table => new
                {
                    picture_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    image = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_pictures", x => x.picture_id);
                });

            migrationBuilder.CreateTable(
                name: "topics",
                columns: table => new
                {
                    topic_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    count_of_discussing = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    description = table.Column<string>(type: "text", nullable: false, defaultValue: ""),
                    date_of_creating = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    last_modification = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_topics", x => x.topic_id);
                });

            migrationBuilder.CreateTable(
                name: "types_of_users",
                columns: table => new
                {
                    type_of_user_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "varchar", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_types_of_users", x => x.type_of_user_id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nickname = table.Column<string>(type: "text", nullable: true),
                    email = table.Column<string>(type: "varchar", nullable: false),
                    password = table.Column<string>(type: "varchar", nullable: false),
                    salt = table.Column<string>(type: "text", nullable: false),
                    picture_id = table.Column<int>(type: "integer", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    date_of_registration = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    type_of_user_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_users", x => x.user_id);
                    table.ForeignKey(
                        name: "fk_users_pictures_picture_id",
                        column: x => x.picture_id,
                        principalTable: "pictures",
                        principalColumn: "picture_id");
                    table.ForeignKey(
                        name: "fk_users_types_of_users_type_of_user_id",
                        column: x => x.type_of_user_id,
                        principalTable: "types_of_users",
                        principalColumn: "type_of_user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "discussions",
                columns: table => new
                {
                    discussion_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    topic_id = table.Column<int>(type: "integer", nullable: false),
                    user_id = table.Column<int>(type: "integer", nullable: false),
                    count_of_messages = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    date_of_creating = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    last_modification = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_discussions", x => x.discussion_id);
                    table.ForeignKey(
                        name: "fk_discussions_topics_topic_id",
                        column: x => x.topic_id,
                        principalTable: "topics",
                        principalColumn: "topic_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_discussions_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "messages",
                columns: table => new
                {
                    message_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    text = table.Column<string>(type: "text", nullable: false),
                    user_id = table.Column<int>(type: "integer", nullable: false),
                    discussion_id = table.Column<int>(type: "integer", nullable: false),
                    date_of_publication = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    last_modification = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_messages", x => x.message_id);
                    table.ForeignKey(
                        name: "fk_messages_discussions_discussion_id",
                        column: x => x.discussion_id,
                        principalTable: "discussions",
                        principalColumn: "discussion_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_messages_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "message_picture",
                columns: table => new
                {
                    messages_message_id = table.Column<int>(type: "integer", nullable: false),
                    pictures_picture_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_message_picture", x => new { x.messages_message_id, x.pictures_picture_id });
                    table.ForeignKey(
                        name: "fk_message_picture_messages_messages_message_id",
                        column: x => x.messages_message_id,
                        principalTable: "messages",
                        principalColumn: "message_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_message_picture_pictures_pictures_picture_id",
                        column: x => x.pictures_picture_id,
                        principalTable: "pictures",
                        principalColumn: "picture_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_discussions_topic_id",
                table: "discussions",
                column: "topic_id");

            migrationBuilder.CreateIndex(
                name: "ix_discussions_user_id",
                table: "discussions",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_message_picture_pictures_picture_id",
                table: "message_picture",
                column: "pictures_picture_id");

            migrationBuilder.CreateIndex(
                name: "ix_messages_discussion_id",
                table: "messages",
                column: "discussion_id");

            migrationBuilder.CreateIndex(
                name: "ix_messages_user_id",
                table: "messages",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_topics_name",
                table: "topics",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_types_of_users_name",
                table: "types_of_users",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_users_email",
                table: "users",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_users_nickname",
                table: "users",
                column: "nickname",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_users_picture_id",
                table: "users",
                column: "picture_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_users_type_of_user_id",
                table: "users",
                column: "type_of_user_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "message_picture");

            migrationBuilder.DropTable(
                name: "messages");

            migrationBuilder.DropTable(
                name: "discussions");

            migrationBuilder.DropTable(
                name: "topics");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "pictures");

            migrationBuilder.DropTable(
                name: "types_of_users");
        }
    }
}
