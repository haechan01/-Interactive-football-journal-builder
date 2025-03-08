from app.extensions import ma
from app.models.journal import Journal
from marshmallow import fields

class JournalSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Journal
        load_instance = True
        
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    content = fields.Str(required=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

journal_schema = JournalSchema()
journals_schema = JournalSchema(many=True)
